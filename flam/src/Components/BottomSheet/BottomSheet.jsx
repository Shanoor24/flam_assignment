import React, {useState} from "react";
import styles from "./BottomSheet.module.css"
import DraggableContainer from "./DragableContainer";


function BottomSheet (props) {
    const {
        handleSheetClose=() => {},
        headerText="Bottom Sheet",
        content = () => {return <div>There is no content</div>},
    } = props
    const [isSheetDraged, setIsSheetDraged] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const handleOnClick = (e) => {
        if (!isSheetDraged) {
            handleSheetClose();
        }
    }

    const handleOpacity = (UpdatedOpacity) => {
        setOpacity(UpdatedOpacity);
    }

    const onSheetDragged = (sheetDraggedValue) => {
        setIsSheetDraged(sheetDraggedValue);
    }
    return (
        <>
        {<div style={{ opacity: opacity }} className={`${styles.sheetContainer}`}
         onClick={handleOnClick}
         onMouseDown={() => setIsSheetDraged(false)}
         >
            <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: "center"}}>
                <DraggableContainer handleOpacity={handleOpacity} handleSheetClose={handleSheetClose} onSheetDragged={onSheetDragged} headerText={headerText} content={content}/>
            </div>
        </div>}
        </>
    )
}

export default BottomSheet;