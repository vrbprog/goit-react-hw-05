import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {

    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
    
    return (
        <div className={css.title}>
            <h1 className={css.header}>404 Not Found</h1>
            <h3>After 5 seconds you will be navigete to Home page</h3>
        </div>
    );
};
