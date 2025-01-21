import { create } from 'zustand'

export interface Card {
  id: number
  name: string
  desc?: string
  completedDays: Date[]
  color: 'blue' | 'red' | 'green'
  icon: undefined
}

interface CardListState {
  cards: Card[]
  setCardsOrder: (cards: Card[]) => void
  addNewCard: (card: Card) => void
  deleteCard: (id: number) => void
  completeDay: (id: number) => void
  resetCards: () => void
}

const useCardListSlice = create<CardListState>((set) => ({
  cards: [],
  setCardsOrder: (cards: Card[]) => set({ cards }),
  addNewCard: (card: Card) =>
    set((state) => ({
      cards: [card, ...state.cards]
    })),
  deleteCard: (id: number) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id)
    })),
  completeDay: (id: number) =>
    set((state) => ({
      cards: state.cards.map(card =>
        card.id === id
          ? { ...card, completedDays: [...card.completedDays, new Date()] }
          : card
      )
    })),
  resetCards: () => set(() => ({ cards: [] }))
}))

export default useCardListSlice
