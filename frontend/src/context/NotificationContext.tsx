import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertColor } from "@mui/material";
import Notification from "../components/Notification/Notification";

// Interface for the notification state
interface NotificationState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

// Interface for the context value
interface NotificationContextValue {
  showNotification: (message: string, severity: AlertColor) => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);
// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Notification state
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: "",
    severity: "success",
  });

  // Function to handle closing notification
  const handleClose = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  // Function to show notification
  const showNotification = useCallback(
    (message: string, severity: AlertColor) => {
      setNotification({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleClose}
        autoHideDuration={3000}
      />
    </NotificationContext.Provider>
  );
};
// Custom hook for using notifications
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
