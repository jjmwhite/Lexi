import { openModal, closeModal } from './modal/mobile-modal';
import Form from './scripts/form';
import Reset from './scripts/reset';

if (window.innerWidth < 800) {
  openModal()
}

// if (window.innerWidth >= 800) {
//   closeModal();
// }