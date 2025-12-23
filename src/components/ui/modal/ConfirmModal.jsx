"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import { Button } from "../button";

/**
 * ConfirmModal - مودال تایید برای عملیات‌های حساس
 * @param {boolean} isOpen - وضعیت باز/بسته بودن مودال
 * @param {function} onClose - تابع بستن مودال
 * @param {function} onConfirm - تابع تایید عملیات
 * @param {string} title - عنوان مودال
 * @param {string} message - پیام توضیحی
 * @param {string} confirmText - متن دکمه تایید
 * @param {string} cancelText - متن دکمه لغو
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        {/* Warning Icon & Message */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="text-foreground/80 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
