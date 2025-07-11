export class ClipboardUtils {
  static async copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      throw error
    }
  }
}