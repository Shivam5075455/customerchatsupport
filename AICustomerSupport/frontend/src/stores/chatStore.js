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
}

const chatStore = new ChatStore();
export default chatStore;