
export default function GoBackButton() {
    return (
        <button onClick={() => window.history.back()}>
            Go back
        </button>
    );
    
};
