import React, {ComponentPropsWithoutRef} from 'react';
import {Toast as PolarisToast} from '@shopify/polaris';

export type ToastOptions = ComponentPropsWithoutRef<typeof PolarisToast>;
export type ToastOptionsPartial = Partial<ToastOptions>;

export function useToast(): [
  React.ComponentType,
  (toast?: ToastOptionsPartial) => void,
] {
  const [toast, setToast] = React.useState<ToastOptionsPartial | null>(null);

  const remove = React.useCallback(() => {
    setToast(null);
  }, [setToast]);

  const show = React.useCallback(
    (toastOptions?: ToastOptionsPartial) => {
      if (toastOptions) {
        setToast(toastOptions);
      }
    },
    [setToast],
  );

  const Toast = React.useMemo(() => {
    return function Toasts() {
      if (!toast) {
        return null;
      }

      function onDismiss() {
        if (toast && toast.onDismiss) {
          toast.onDismiss();
        }
        remove();
      }

      const content = toast.content || '';

      const combinedProps = {
        ...toast,
        onDismiss,
        content,
      };

      return <PolarisToast {...combinedProps} />;
    };
  }, [toast, remove]);

  return [Toast, show];
}
