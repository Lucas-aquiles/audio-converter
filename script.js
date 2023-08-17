document.addEventListener("DOMContentLoaded", () => {
  const one = document.getElementById("one");
  const two = document.getElementById("two");
  const three = document.getElementById("three");
  const btn = document.querySelector("#btn");
  const btn1 = document.querySelector("#btn1");

  class Queue {
    constructor() {
      this.items = [];
    }

    addqueue(item) {
      this.items.push(item);
    }

    async subtractqueue() {
      if (!this.isEmpty()) {
        const item = this.items.shift();
        await item();
      }
    }

    isEmpty() {
      return this.items.length === 0;
    }

    async processAll() {
      while (!this.isEmpty()) {
        await this.subtractqueue();
      }
    }
  }

  const queue = new Queue();

  btn.addEventListener("click", () => {
    let colorstyle = ["change", "changetwo", "changethree"];
    let divContainer = [one, two, three];
    for (let i = 0; i < colorstyle.length; i++) {
      queue.addqueue(async () => {
        console.log(` Proceso empezando ${colorstyle[i]}`);
        await new Promise((resolve) =>
          setTimeout(() => {
            divContainer[i].classList.add(colorstyle[i]);
            resolve();
          }, 1500)
        );
        console.log(` Proceso  terminando ${colorstyle[i]}`);
      });
    }

    btn.classList.add("hidden");
    runQueue();
  });

  async function runQueue() {
    await queue.processAll();
    console.log("Todos los procesos han sido completados.");
  }
  btn1.addEventListener("click", () => {
    location.reload();
  });
});
