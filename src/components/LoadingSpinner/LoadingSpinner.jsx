import { BlinkBlur } from "react-loading-indicators";
import css from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
    return (
        <div className={css.spinner}>
            <BlinkBlur color="#32cd32" size="large" text="Loading..." textColor="#2b2aed"></BlinkBlur>
        </div>
    );
};
