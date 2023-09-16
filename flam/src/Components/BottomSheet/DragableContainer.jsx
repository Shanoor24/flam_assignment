import React, { useState, useEffect } from "react";
import styles from "./DragableContainer.module.css";

function DraggableContainer(props) {
  const {
    handleSheetClose,
    onSheetDragged,
    headerText,
    content,
    handleOpacity,
  } = props;
  const [dragStartY, setDragStartY] = useState(null);
  const [height, setHeight] = useState(350);
  const [contentHeight, setContentHeight] = useState(230);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragStartY !== null) {
        const deltaY = e.clientY - dragStartY;
        setHeight((prevHeight) => prevHeight - deltaY);
        setContentHeight((prevHeight) => prevHeight - deltaY);
        setDragStartY(e.clientY);
        onSheetDragged(true);
        console.log("mouse is moving");
      }
    };

    const handleMouseUp = () => {
      setDragStartY(null);
      if (height > 400) {
        console.log("hight", height);
        setHeight(600);
        setContentHeight(480);
      }
      if (height > 150 && height < 400) {
        console.log("hight", height);
        setHeight(350);
        setContentHeight(230);
      }
      if (height < 150) {
        console.log("hight", height);
        setHeight(0);
        setContentHeight(230);
        handleSheetClose();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragStartY]);

  useEffect(() => {
    console.log("hight", height);
    if (height === 350 || height > 350) {
      handleOpacity(1);
    } else if (height < 350 && height > 335) {
      handleOpacity(0.9);
    } else if (height < 335 && height > 315) {
      handleOpacity(0.8);
    } else if (height < 315 && height > 300) {
      handleOpacity(0.7);
    } else if (height < 300 && height > 280) {
      handleOpacity(0.6);
    } else if (height < 280 && height > 255) {
      handleOpacity(0.5);
    } else if (height < 255 && height > 215) {
      handleOpacity(0.4);
    } else if (height < 215 && height > 195) {
      handleOpacity(0.3);
    } else if (height < 195 && height > 150) {
      handleOpacity(0.1);
    }
  }, [height]);

  const handleMouseDown = (e) => {
    setDragStartY(e.clientY);
  };

  return (
    <div
      className={`${styles.draggableContainer}`}
      style={{ height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.sheetContentContainer}>
        <div className={styles.draggableIcon}></div>
        <div className={styles.header}>{headerText}</div>
        <div
          style={{ height: `${contentHeight}px` }}
          className={styles.sheetContentWrapper}
        >
          <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            {content()}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSheetClose} className={styles.doneButton}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default DraggableContainer;
