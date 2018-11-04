export interface IModalProps {
    isOpened: boolean;
    children: JSX.Element | JSX.Element [] | string | null;
    onClose: () => void;
    header: string;
}