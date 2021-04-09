interface Props {
    openDelay: number;
    closeDelay: number;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    lockScroll: boolean;
    modal: boolean;
    modalAppendToBody: boolean;
    modalClass?: string;
    modalFade: boolean;
    zIndex?: number;
}
declare const usePopup: (props: Readonly<Props>, doClose: () => void, rootRef?: string) => {
    state: {
        opened: boolean;
        bodyPaddingRight: any;
        computedBodyPaddingRight: number;
        withoutHiddenClass: boolean;
        rendered: boolean;
        visible: boolean;
    };
    open: (options?: any) => void;
    close: () => void;
    doAfterClose: () => void;
    updateClosingFlag: (value: any) => void;
    restoreBodyStyle: () => void;
};
export default usePopup;
