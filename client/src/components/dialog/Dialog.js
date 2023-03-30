import { forwardRef, useImperativeHandle } from "react";

const Dialog = forwardRef(
  (
    {
      id,
      header,
      content,
      actionList,
      actionsAlign = "center",
      isModal = false,
      width,
      height,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => {
      return {
        openModal: () => open(),
        closeModal: () => close(),
      };
    });

    const open = () => {
      document.getElementById(`${id}`).showModal();
    };

    const close = () => {
      document.getElementById(`${id}`).close();
    };

    const styles = {
      width: width ? width : "",
      height: height ? height : "",
    };
    return (
      <dialog id={id} onClick={isModal ? null : close} style={styles}>
        {(header || isModal) && (
          <>
            <header className="header-Modal">
              <h4>{header?.title ? header.title : ""}</h4>
              <button
                type="button"
                className="header-Modal-close"
                onClick={close}
              >
                X
              </button>
            </header>
            <content className="main-Modal">
              <p>{content ? content : ""}</p>
              {actionList.map((button, index) => {
                return (
                  <button onClick={button.action} type={button.type}>
                    {button.label}
                  </button>
                );
              })}
            </content>
            <footer className="footer-Modal"></footer>
          </>
        )}
      </dialog>
    );
  }
);

export default Dialog;

const openModal = (ref) => {
  ref?.current?.openModal && ref.current.openModal();
};

const closeModal = (ref) => {
  ref?.current?.closeModal && ref.current.closeModal();
};

export { openModal, closeModal };
