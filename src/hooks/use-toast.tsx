"use client"

// A simple toast hook for notifications
export function useToast() {
  const toast = (message: string) => {
    console.log("Toast message:", message)
    // In a real app, you would use a toast library here
    const toastElement = document.createElement('div')
    toastElement.className = 'fixed top-4 right-4 bg-primary text-primary-foreground p-4 rounded-md shadow-lg z-50'
    toastElement.textContent = message
    document.body.appendChild(toastElement)
    
    setTimeout(() => {
      toastElement.remove()
    }, 3000)
  }
  
  return { toast }
} 