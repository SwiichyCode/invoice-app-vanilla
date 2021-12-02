"use strict";

const response = await fetch(`/data/data.json`);
const data = await response.json();

let users = data;

class User {
  constructor() {
    this.list = document.querySelector(".content-list");
    this.userList = document.querySelector(".content-user");
    this.renderUsers();
    this.createDomElement();
  }

  //////////////////////
  // Global function //
  ////////////////////

  dateGestion(date) {
    // prettier-ignore
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let newDate = new Date(date);
    let day = newDate.getUTCDate();
    if (day < 10) {
      day = "0" + newDate.getUTCDate();
    }
    let formattedDate =
      day + " " + monthNames[newDate.getMonth()] + " " + newDate.getFullYear();
    return formattedDate;
  }

  separator(numb) {
    const str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  // Status Gestion Users (a debuger)
  statusGestionUsers(item, query) {
    if (item.status.length === 4) {
      query.classList.add("paid");
    } else if (item.status.length === 7) {
      query.classList.add("pending");
    } else {
      query.classList.add("draft");
    }
  }

  /////////////////////
  // Render function //
  ////////////////////
  renderUsers() {
    this.idItem = location.search.substring(4);

    if (users.length > 1 && location.search.substring(4) == "") {
      users.forEach((item) => {
        this.createDomElements(item);
        this.statusGestionUsers(item, this.li);
        this.list.appendChild(this.li);
      });
    } else if (location.search.substring(4) == this.idItem) {
      users.forEach((item) => {
        this.createDomElement(item);
        this.statusGestionUsers(item, this.status);
      });
    } else {
      this.createNothingElt();
    }
  }

  // Create Nothing Elt
  createNothingElt() {
    this.list.innerHTML = `
    <div class="nothingList">
      <img src="./assets/illustration-empty.svg" />
      <h2>There is nothing here</h2>
      <p class="firstBody">Create an invoice by clicking the <span>New Invoice</span> button and get started</p>
    </div>
    `;
  }

  // Create Dom Elements
  createDomElements(item, id) {
    //Create elt
    this.li = document.createElement("a");
    this.li.setAttribute("href", "invoice.html?id=" + item.id);
    this.li.setAttribute("data-id", id);
    this.li.classList.add("content-list__item");

    this.li.innerHTML = `
    <span id="data-Ref"><span class="hashtag">#</span>${item.id}</span>
    <span id="data-Date">Due ${this.dateGestion(item.paymentDue)}</span>
    <span id="data-Name">${item.clientName}</span>
    <span id="data-Total">£ ${this.separator(item.total.toFixed(2))}</span>
    <div class="data-Status"><span class="content-dot"><span class="dot"></span>${
      item.status
    }</span></div>
    <img src="./assets/icon-arrow-right.svg" />
    `;
  }

  createDomElement() {
    users.forEach((item) => {
      if (item.id === this.idItem) {
        this.userList.innerHTML = `
            <div href="index.html" class="content-user__back">
                <img src="./assets/icon-arrow-left.svg" alt="" />
                <span>Go back</span>
            </div>
            <div class="content-user__gestion">
                <div class="content-user__gestion-status">
                    <span class="status">Status</span>
                    <div><span class="content-dot"><span class="dot"></span class="status">${
                      item.status
                    }</span></div>
                </div>
                <div class="content-user__gestion-btn">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="paid">Mark as Paid</button>
                </div>
            </div>
            <div class="content-user__information">
                <div class="content-user__information-header">
                    <div class="content-id">
                        <span class="user-id"><span>#</span>${item.id}</span>
                        <span class="user-desc">${item.description}</span>
                    </div>
                    <div class="content-adress">
                        <ul>
                            <li>${item.senderAddress.street}</li>
                            <li>${item.senderAddress.city}</li>
                            <li>${item.senderAddress.postCode}</li>
                            <li>${item.senderAddress.country}</li>
                        </ul>
                    </div>
                </div>
                <div class="content-user__information-main">
                    <div class="content-paymentDate">
                        <div class="invoice-d">
                            <span class="title-d">Invoice date</span>
                            <span class="date-d">${this.dateGestion(
                              item.createdAt
                            )}</span>
                        </div>
                        <div class="invoice-d">
                        <span class="title-d">Payment Due</span>
                        <span class="date-d">${this.dateGestion(
                          item.paymentDue
                        )}</span>
                    </div>
                    </div>
                </div>
            </div>
          `;
      }
    });
  }
}

const user = new User();
