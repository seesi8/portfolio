export default function Loader({ show }) {
    return (
        <>
            {show ?
                <div className="loaderContainer">
                    <div className="loader"></div>
                </div>
                : null}
        </>
    )

}