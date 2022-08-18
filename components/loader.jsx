export default function Loader({ show }) {
    
    //used to show a loader
    
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