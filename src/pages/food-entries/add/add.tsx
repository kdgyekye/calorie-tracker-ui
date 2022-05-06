import {
  useState,
  //useEffect,
  Fragment,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  ApolloError,
  useMutation,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import {
  CREATE_FOOD_ENTRY,
  UPDATE_FOOD_ENTRY,
} from "../../../services/graphql/food-entries/mutations";
import { GET_MEALS } from "../../../services/graphql/meals/queries";
import { GET_USERS } from "../../../services/graphql/users/queries";
import {
  IGetMealsInput,
  IGetMealsResponse,
} from "../../../services/graphql/meals/types";
import {
  ICreateFoodEntryInput,
  ICreateFoodEntryResponse,
  IUpdateFoodEntryInput,
  IUpdateFoodEntryResponse,
  IFoodEntry,
} from "../../../services/graphql/food-entries/types";
import { BasicModal } from "../../../components/modals";
import { CircleSpinner } from "react-spinners-kit";
import toast from "react-hot-toast";
import _ from "lodash";
import { useCurrentUser } from "../../../services/context/currentUser";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "../../../components/classnames";

interface IAddFoodEntryProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  update: boolean;
  data?: IFoodEntry | undefined;
}

const AddFoodEntry: FC<IAddFoodEntryProps> = ({
  show,
  setShow,
  refetch,
  update,
  data,
}) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [meal, setMeal] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [userSearch, setUserSearch] = useState("");

  const currentUser = useCurrentUser();

  const [invokeCreateFoodEntry, { loading }] = useMutation<
    ICreateFoodEntryResponse,
    ICreateFoodEntryInput
  >(CREATE_FOOD_ENTRY);

  const [invokeUpdateFoodEntry, { loading: updating }] = useMutation<
    IUpdateFoodEntryResponse,
    IUpdateFoodEntryInput
  >(UPDATE_FOOD_ENTRY);

  const { data: meals, loading: mealsLoading } = useQuery<
    IGetMealsResponse,
    IGetMealsInput
  >(GET_MEALS, {
    fetchPolicy: "no-cache",
  });

  const [getUsers, { data: usersData, loading: usersLoading }] =
    useLazyQuery(GET_USERS);

  const resetState = () => {
    setName("");
    setCalories(0);
    setMeal("");
    setSelectedUser({});
  };

  useEffect(() => {
    console.log(userSearch);
    getUsers({
      variables: {
        filter: userSearch
          ? {
              name: userSearch,
              role: "USER",
            }
          : {
              role: "USER",
            },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSearch]);

  useEffect(() => {
    if (update) {
      setName(data?.food);
      setCalories(data?.calorieValue);
      setMeal(data?.meal?._id);
      setSelectedUser(data?.user);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name.trim() === "" || calories === 0 || meal.trim() === "") {
      return toast.error("Please fill all the fields");
    }
    if (update) {
      invokeUpdateFoodEntry({
        variables: {
          input:
            currentUser?.role === "USER"
              ? {
                  food: name,
                  calorieValue: calories,
                  meal,
                }
              : {
                  food: name,
                  calorieValue: calories,
                  meal,
                  user: selectedUser._id,
                },
        },
      });
    } else {
      invokeCreateFoodEntry({
        variables: {
          input:
            currentUser?.role === "USER"
              ? {
                  food: name,
                  calorieValue: calories,
                  meal,
                }
              : {
                  food: name,
                  calorieValue: calories,
                  meal,
                  user: selectedUser._id,
                },
        },
      })
        .then(() => {
          refetch();
          setShow(false);
          toast.success("Food entry created successfully");
          resetState();
        })
        .catch((err: ApolloError) => {
          toast.error(_.startCase(_.lowerCase(err?.graphQLErrors[0]?.message)));
        });
    }
  };

  console.log(meals);
  return (
    <BasicModal show={show} setShow={setShow}>
      <div className="p-8 ">
        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={() => setShow(false)}
            type="button"
            className="text-red-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition ease-in-out duration-150"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={(e: any) => {
            handleSubmit(e);
          }}
        >
          <span className={"font-medium text-lg mt-5"}>Add New Food Entry</span>
          <div className="mt-5 grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <label
                htmlFor="meal"
                className="block text-sm pb-1 font-medium text-gray-700"
              >
                Name of Food <span className={"text-red-600"}>*</span>
              </label>
              <input
                type="text"
                id="food-name"
                name="food-name"
                required
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                className="shadow-none font-light py-2 px-2 bg-white border focus:outline-none block w-full sm:text-sm border-gray-300 rounded-md focus:ring-gold-1  focus:shadow-outline-purple focus:border-gold-1"
                placeholder="Eg. Sandwich"
              />
            </div>
            <div className="col-span-12">
              <div className={"relative"}>
                <label
                  htmlFor="meal"
                  className="block text-sm pb-1 font-medium text-gray-700"
                >
                  Meal <span className={"text-red-600"}>*</span>
                </label>
                <div className="mt-1 rounded-none shadow-none">
                  <select
                    id="meal"
                    name="meal"
                    required
                    value={meal}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setMeal(e.target.value);
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gold-1 focus:border-gold-1 sm:text-sm rounded-md"
                  >
                    <option>Please Choose Meal</option>
                    {mealsLoading ? (
                      <Fragment>
                        <option>Loading...</option>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {meals ? (
                          <Fragment>
                            {meals?.meals?.length === 0 ? (
                              <Fragment>
                                <option>No meal found</option>
                              </Fragment>
                            ) : (
                              <Fragment>
                                {meals?.meals?.map((item, itemIdx: number) => (
                                  <Fragment key={itemIdx}>
                                    <option value={item?._id}>
                                      {item?.name}
                                    </option>
                                  </Fragment>
                                ))}
                              </Fragment>
                            )}
                          </Fragment>
                        ) : (
                          <Fragment>
                            <option>
                              An error occured trying to load the data
                            </option>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </select>
                </div>
              </div>
            </div>
            {currentUser?.role === "ADMIN" ? (
              <div className="col-span-12">
                <Combobox
                  as="div"
                  value={selectedUser}
                  onChange={setSelectedUser}
                >
                  <Combobox.Label className="block text-sm font-medium text-gray-700">
                    User
                  </Combobox.Label>
                  <div className="relative mt-1">
                    <Combobox.Input
                      className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setUserSearch(event.target.value)}
                      displayValue={(person: any) => person?.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {usersLoading ? (
                        <Combobox.Option
                          className={
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          }
                          value="Loading"
                          disabled
                        >
                          Loading Users...
                        </Combobox.Option>
                      ) : (
                        usersData?.users?.length > 0 &&
                        usersData?.users?.map((person: any) => (
                          <Combobox.Option
                            key={person._id}
                            value={person}
                            className={({ active }) =>
                              classNames(
                                "relative cursor-default select-none py-2 pl-3 pr-9",
                                active
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-900"
                              )
                            }
                          >
                            {({ active, selected }) => (
                              <>
                                <span
                                  className={classNames(
                                    "block truncate",
                                    selected && "font-semibold"
                                  )}
                                >
                                  {person.name}
                                </span>

                                {selected && (
                                  <span
                                    className={classNames(
                                      "absolute inset-y-0 right-0 flex items-center pr-4",
                                      active ? "text-white" : "text-indigo-600"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            ) : null}
            <div className="col-span-12">
              <label
                htmlFor="calories"
                className="block text-sm pb-1 font-medium text-gray-700"
              >
                Number of Calories <span className={"text-red-600"}>*</span>
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                required
                min={0}
                value={calories}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCalories(parseInt(e.target.value));
                }}
                className="shadow-none font-light py-2 px-2 bg-white border focus:outline-none block w-full sm:text-sm border-gray-300 rounded-md focus:ring-gold-1  focus:shadow-outline-purple focus:border-gold-1"
                placeholder="Eg. 12"
              />
            </div>
          </div>
          <div className="pt-2 border-t border-gray-200 mt-5  flex justify-end">
            <span className="inline-flex rounded-none shadow-sm mr-2 ">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="inline-flex rounded-lg items-center px-6 py-2 border border-gold-1 text-sm leading-5 font-light text-gold-1 hover:text-gold-1 bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-gold-1 active:bg-gold-1 transition duration-150 ease-in-out"
              >
                <span className="mx-1">Close</span>
              </button>
            </span>
            <span className="inline-flex rounded-none shadow-sm ">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex flex-row items-center px-4 py-2 border border-transparent text-sm leading-5 font-light rounded-lg text-white bg-blue-700 hover:bg-orange-600 focus:outline-none focus:shadow-outline-gray focus:border-blue-800 active:bg-blue-600 transition duration-150 ease-in-out"
              >
                {loading ? (
                  <Fragment>
                    <CircleSpinner loading color="#fff" size={13} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <span className="mx-1">Save</span>
                  </Fragment>
                )}
              </button>
            </span>
          </div>
        </form>
      </div>
    </BasicModal>
  );
};

export default AddFoodEntry;
