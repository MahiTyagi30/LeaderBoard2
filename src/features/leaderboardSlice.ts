import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Score {
  username: string;
  score: string; // Format MM:SS:MSS
}

interface LeaderboardState {
  scores: Score[];
}

const initialState: LeaderboardState = {
  scores: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      state.scores.push(action.payload);
      state.scores.sort((a, b) => {
        const [aMin, aSec, aMs] = a.score.split(':').map(Number);
        const [bMin, bSec, bMs] = b.score.split(':').map(Number);
        return aMin - bMin || aSec - bSec || aMs - bMs;
      });
      if (state.scores.length > 10) {
        state.scores.pop();
      }
    },
  },
});

export const { addScore } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
