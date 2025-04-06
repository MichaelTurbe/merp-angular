import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: HTMLElement[] = [];
  constructor() { }
  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success', duration: number = 3000, position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right', backgroundColor: string = '#333', textColor: string = '#fff', fontSize: string = '14px') {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    toast.style.backgroundColor = backgroundColor;
    toast.style.color = textColor;
    toast.style.fontSize = fontSize;
    document.body.appendChild(toast);
    this.toasts.push(toast);
    switch (position) {
      case 'top-right':
        toast.style.top = `${20 + (this.toasts.length - 1) * 60}px`;
        toast.style.right = '20px';
        break;
      case 'top-left':
        toast.style.top = `${20 + (this.toasts.length - 1) * 60}px`;
        toast.style.left = '20px';
        break;
      case 'bottom-right':
        toast.style.bottom = `${20 + (this.toasts.length - 1) * 60}px`;
        toast.style.right = '20px';
        break;
      case 'bottom-left':
        toast.style.bottom = `${20 + (this.toasts.length - 1) * 60}px`;
        toast.style.left = '20px';
        break;
    }
    setTimeout(() => {
      toast.remove();
      this.toasts.splice(this.toasts.indexOf(toast), 1);
      this.repositionToasts();
    }, duration);
  }
  private repositionToasts() {
    this.toasts.forEach((toast, index) => {
      switch (toast.style.position) {
        case 'top-right':
          toast.style.top = `${20 + index * 60}px`;
          break;
        case 'top-left':
          toast.style.top = `${20 + index * 60}px`;
          break;
        case 'bottom-right':
          toast.style.bottom = `${20 + index * 60}px`;
          break;
        case 'bottom-left':
          toast.style.bottom = `${20 + index * 60}px`;
          break;
      }
    });
  }
}
