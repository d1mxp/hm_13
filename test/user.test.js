import { expect } from "chai";
import { fetchUsers } from "../index.js";
import fetch from "node-fetch";
import sinon from "sinon";

global.fetch = fetch;

describe("получение пользователей с сервера", () => {
  afterEach(() => {
    sinon.restore();
  });

  let fetchStub;

  it("сравнение с моковыми пользователями", async () => {
    const mockUser = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
    ];

    fetchStub = sinon.stub(global, "fetch").resolves({
      ok: true,
      json: async () => mockUser,
    });

    const users = await fetchUsers();

    expect(fetchStub.calledOnce).to.be.true;
    expect(users).to.deep.equal(mockUser);
  });

  it("должен выбрасывать ошибку", async () => {
    try {
      await fetchUsers();
    } catch (error) {
      expect(error.message).to.equal("Ошибка");
    }
  });
});

describe("fetchUsers", () => {
  it("должен вернуть массив пользователей где id является числом и name строкой", async () => {
    const users = await fetchUsers();

    expect(users).to.be.an("array");

    users.forEach((user) => {
      expect(user).to.have.property("id").that.is.a("number");
      expect(user).to.have.property("name").that.is.a("string");
    });
  });
});
