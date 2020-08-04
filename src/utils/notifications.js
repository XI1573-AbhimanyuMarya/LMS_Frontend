import { store } from 'react-notifications-component';

export const success = (message = null) => {
    return store.addNotification({
        title: 'Success!',
        message: message,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });
}

export const error = (message = null) => {
    return store.addNotification({
        title: 'Error!',
        message: message,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });
}
