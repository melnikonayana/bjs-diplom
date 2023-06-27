const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

const ratesBoard = new RatesBoard();

ratesBoard.getExchangeRates = () => {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
ratesBoard.getExchangeRates();
setInterval(ratesBoard.getExchangeRates, 6000);

const money = new MoneyManager;

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Баланс успешно пополнен");
        }  else {
            money.setMessage(response.success, response.error);
        }
    })
}

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
        ProfileWidget.showProfile(response.data);
        money.setMessage(response.success, "Конвертация прошла успешно");
        }
        else {
            money.setMessage(response.success, response.error);
        }
    })
}

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Перевод средств успешно выполнен");
        }
        else {
            money.setMessage(response.success, response.error);
        }
    })
}

const favorite = new FavoritesWidget;

ApiConnector.getFavorites(response=> {
    if(response.success) {
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    }
})

favorite.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(response.success, "Пользователь успешно добавлен")
        } else {
            favorite.setMessage(response.success, response.error);
        }
    })
}

favorite.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if(response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(response.success, "Пользователь удалён")
        } else {
            favorite.setMessage(response.success, response.error);
        }
    })
}