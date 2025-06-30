import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class ChatStore {
  messages = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async sendMessage(userId, content) {
    this.loading = true;
    this.messages.push({ role: "user", content });

    try {
      const res = await axios.post("http://localhost:5000/api/message", {
        userId,
        message: content,
      });

      runInAction(() => {
        this.messages.push({ role: "assistant", content: res.data.reply });
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.messages.push({ role: "assistant", content: "Oops! Something went wrong." });
        this.loading = false;
      });
    }
  }

  // fetch the chat history for a user
async fetchHistory(userId) {
    try {
      const res = await axios.get(`http://localhost:5000/api/history/${userId}`);
      this.messages = res.data.messages || [];
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  }
}

const chatStore = new ChatStore();
export default chatStore;