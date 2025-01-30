export interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  storeName: string;
}
