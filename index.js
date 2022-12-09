class Good {
    
    //конструктор экземпляра товара принимающий параметры соответствующие свойствам выше
    constructor(good) {
        this.id = goodId;                    //Код товара
        this.name = good.name;                //Наименование
        this.description = good.description;  //Описание
        this.sizes = good.sizes;              //массив возможных размеров
        this.price = good.price;              //цена товара
        this.available = good.available;      //Признак доступности для продажи
        goodId++;
    }

    //изменение признака доступности для продажи
    setAvailable(available) {this.available = available;}
}

class GoodsList {
    #goods

    constructor(filter = "", sortPrice = true, sortDir = true) {
        this.#goods = [];                         //массив экземпляров объектов класса Good (приватное поле)
        this.filter = new RegExp(filter, "im");  //регулярное выражение используемое для фильтрации товаров по полю name
        this.sortPrice = sortPrice;               //булево значение, признак включения сортировки по полю Price
        this.sortDir = sortDir;                   //булево значение, признак направления сортировки по полю Price (true - по возрастанию, false - по убыванию)
    }


    setFilter(filter) {this.filter = new RegExp(filter, "im");}

    setSortPrice(sortPrice) {this.sortPrice = sortPrice;}

    setSortDir(sortDir) {this.sortDir = sortDir;}

    //возвращает массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price
    get list() {
        //let arr = this.#goods.slice();

        //Фильтрация:
        let arr = this.#goods.filter( item => this.filter.test(item.name) );

        //Сортировка:
        if (this.sortPrice) {
            //arr.sort(function(a, b) { return a.price - b.price; });
            arr.sort( (a, b) => (a.price - b.price) );
            if (!this.sortDir) {arr.reverse();};
        };

        return arr;
    }

    //добавление товара в каталог
    add(good) {this.#goods.push(new Good(good));}

    //удаление товара из каталога по его id
    remove(id) {
        this.#goods.forEach((item, index, array) => {
            if (item.id === id) {array.splice(index, 1);}
          });
    }
}

class Basket {
    constructor () {this.goods = [];} //массив объектов класса BasketGood для хранения данных о товарах в корзине

    //возвращает общую стоимость товаров в корзине
    get totalAmount() {return this.goods.reduce((sum, current) => sum + (current.amount * current.price), 0)}

    //возвращает общее количество товаров в корзине
    get totalSum() {return this.goods.reduce((sum, current) => sum + current.amount, 0)}

    //Добавляет товар в корзину, если товар уже есть увеличивает количество
    add(good, amount=1) {
        let ind = this.goods.findIndex(item => item.id == good.id);
        if (ind == -1) {this.goods.push(new BasketGood(good, amount));}
        else {this.goods[ind].amount = this.goods[ind].amount + amount}
    }
    
    //Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
    remove(good, amount=1) {
        let ind = this.goods.findIndex(item => item.id == good.id);
        if (ind != -1) {
            if (this.goods[ind].amount > amount) {this.goods[ind].amount -= amount;}
            else {this.goods.splice(ind, 1)}
        }
    }

    //Очищает содержимое корзины
    clear() {this.goods.length = 0;}

    //Удаляет из корзины товары, имеющие признак available === false (использовать filter())
    removeUnavailable() {this.goods = this.goods.filter( item => item.available );}
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good);
        this.id = good.id;
        goodId--;
        this.amount = amount;  //количество товара в корзине
    }
}

let goodId = 0;
let line1 = "______________________________________________________________________\n"

//Создание экземпляров классов GoodsList и Basket:
let goodsList = new GoodsList();
let basket = new Basket();

//Создание экземпляров класса Good:
if (1) {
    g1 = {
        name: "N1 filtr фильтр",         //Наименование
        description: "D1",  //Описание
        sizes: ["S1",],      //массив возможных размеров
        price: 100,         //цена товара
        available: true,    //Признак доступности для продажи
    }
    g2 = {
        name: "N2 dsg фильтр",         //Наименование
        description: "D2",  //Описание
        sizes: ["S2"],      //массив возможных размеров
        price: 500,         //цена товара
        available: true,    //Признак доступности для продажи
    }
    g3 = {
        name: "N3 filtr",         //Наименование
        description: "D3",  //Описание
        sizes: ["S3", "S4"],      //массив возможных размеров
        price: 400,         //цена товара
        available: false,    //Признак доступности для продажи
    }
    g4 = {
        name: "N4",         //Наименование
        description: "D4",  //Описание
        sizes: ["S3", "S4"],      //массив возможных размеров
        price: 400,         //цена товара
        available: false,    //Признак доступности для продажи
    }

    g5 = {
        name: "N5",         //Наименование
        description: "D5",  //Описание
        sizes: ["S3", "S5", "S6"],      //массив возможных размеров
        price: 293,         //цена товара
        available: true,    //Признак доступности для продажи
    }

    goodsList.add(g1);
    goodsList.add(g2);
    goodsList.add(g3);
    goodsList.add(g4);
    goodsList.add(g5);
}

//Сортировка GoodsList:
if (0) {
    //Отсртированный по возростаняю цены:
    console.log(`${line1}GoodsList отсртированный по возростаняю цены:`);
    console.log(goodsList.list);

    //Отсртированный по убыванию цены:
    goodsList.setSortDir(false);
    console.log(`_____________________________________________________

    GoodsList отсртированный по убыванию цены:`);
    console.log(goodsList.list);
        
    //Отключение сортировки:
    goodsList.setSortPrice(false);
    console.log(`_____________________________________________________
    
    GoodsList неотсртированный:`);
    console.log(goodsList.list);

    //Возвращение значений по умолчанию:
    goodsList.setSortPrice(true);
    goodsList.setSortDir(true);
}

//Фильтрация GoodsList:
if (1) {
    //Задаем фильтрацию:
    console.log(`${line1}Только товары с "фильтр" в имени:`);
    goodsList.setFilter("фильтр");
    console.log(goodsList.list);
    
    console.log(`${line1}Только товары с "filtr" в имени:`);
    goodsList.setFilter("filtr");
    console.log(goodsList.list);

    //Сбрасваем фильтр:
    goodsList.setFilter("");

}

//Удаление товара из GoodsList:
if (0) {
    console.log(`${line1}До удаления:`);
    console.log(goodsList.list);
    goodsList.remove(3);
    console.log(`${line1}После удаления:`);
    console.log(goodsList.list);
}

//Создание BasketGood и добавление их в Basket:
if (1) {
    basket.add(goodsList.list[1], 10);
    basket.add(goodsList.list[0], 5);
    basket.add(goodsList.list[2]);
    basket.add(goodsList.list[1], 2);
    basket.add(goodsList.list[2], 6);
    basket.add(goodsList.list[0], 8);
    basket.add(goodsList.list[0], 11);
}

//Очистка корзины с товарами:
if (0) {basket.clear();}

//Удаление из корзины товары, имеющие признак available === false:
if (0) {basket.removeUnavailable();}

//Уменьшение количества товара в корзине:
if (1) {basket.remove(goodsList.list[0], 3);}

//Стоимость товаров в корзине:
if (1) {
    console.log(`${line1}Стоимость товаров в корзине: ${basket.totalAmount}`);
}

//Количество товаров в корзине:
if (1) {
    console.log(`${line1}Количество товаров в корзине: ${basket.totalSum}`);
}

//Вывод в консоль списка товаров в корзине:
if (0) {
    console.log(`${line1}Список товаров в корзине:`);
    console.log(basket.goods);
}