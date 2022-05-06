import { useTypeSafeTranslation } from "./useTypeSafeTranslation";
import { useEffect } from "react";

export default function useSetPageTitle(document, title) {
  const { t } = useTypeSafeTranslation();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      document.title = t(title) + " | " + process.env.REACT_APP_NAME;
    }

    return () => {
      isMounted = false;
    };
  }, [t, title, document]);
}
