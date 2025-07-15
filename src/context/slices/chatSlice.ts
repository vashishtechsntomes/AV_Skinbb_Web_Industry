import { basePythonApiUrl } from "@/config/baseUrls";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type Message = {
  isUser: boolean;
  content: string;
};

interface ChatState {
  messages: Message[];
  input: string;
  loading: boolean;
  error?: string;
}

const initialState: ChatState = {
  messages: [],
  input: "",
  loading: false,
};

export const sendMessageAsync = createAsyncThunk<
  string, // Return type
  string, // Input argument (the query)
  { rejectValue: string }
>("chat/sendMessage", async (query, { rejectWithValue }) => {
  //   try {
  //     const response = await axios.post("http://localhost:11434/api/generate", {
  //       model: "gemma3:1b",
  //       prompt: query,
  //       stream: true,
  //     });
  //     console.log("🚀 ~ > ~ response:", response);
  //     return response.data?.response || "No response from server.";
  //   } catch {
  //     return rejectWithValue("Failed to contact server.");
  //   }
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(
  //         "According to the context provided, niacinamide has the following benefits for the skin:\n\n1. Brightening - It can help even out skin tone and reduce dullness, giving the skin a brighter appearance.\n\n2. Anti-inflammatory - Niacinamide has soothing properties that can help calm irritation and redness in the skin. This makes it beneficial for sensitive or acne-prone skin.\n\nSo in summary, niacinamide is an active skincare ingredient that can help brighten the complexion, reduce inflammation, and is suitable for those dealing with uneven skin tone, dullness, sensitivity or acne. It is a versatile ingredient with multiple benefits for the skin.",
  //       );
  //     }, 1000); // Simulate network delay)
  //   });
  try {
    const res = await fetch(`${basePythonApiUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    return data.answer;
  } catch {
    return rejectWithValue("Failed to contact server.");
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({ isUser: true, content: action.payload });
    },
    resetChat: (state) => {
      state.messages = [];
      state.input = "";
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ isUser: false, content: action.payload });
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
        state.messages.push({
          isUser: false,
          content: "⚠️ Failed to get response.",
        });
      });
  },
});

export const { setInput, addUserMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
