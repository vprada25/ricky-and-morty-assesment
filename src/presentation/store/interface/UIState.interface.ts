export interface UIState {
  isFilterModalOpen: boolean
  toggleFilterModal: () => void

  error: string | null
  setError: (error: string | null) => void
  clearError: () => void

  isLoading: boolean
  setLoading: (loading: boolean) => void
}
