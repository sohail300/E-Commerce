"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var products, _i, products_1, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    products = [
                        {
                            name: "Smartphone Pro X",
                            image: "https://via.placeholder.com/300x300.png?text=Smartphone+Pro+X",
                            description: "Latest model with advanced features",
                            price: 99900,
                        },
                        {
                            name: "Wireless Earbuds Elite",
                            image: "https://via.placeholder.com/300x300.png?text=Wireless+Earbuds+Elite",
                            description: "High-quality sound with long battery life",
                            price: 14900,
                        },
                        {
                            name: '4K Smart TV 55"',
                            image: 'https://via.placeholder.com/300x300.png?text=4K+Smart+TV+55"',
                            description: "Crystal clear picture with smart features",
                            price: 59900,
                        },
                        {
                            name: "Gaming Laptop Ultra",
                            image: "https://via.placeholder.com/300x300.png?text=Gaming+Laptop+Ultra",
                            description: "Powerful laptop for ultimate gaming experience",
                            price: 149900,
                        },
                        {
                            name: "Fitness Tracker Watch",
                            image: "https://via.placeholder.com/300x300.png?text=Fitness+Tracker+Watch",
                            description: "Track your health and fitness goals",
                            price: 9900,
                        },
                        {
                            name: "Robotic Vacuum Cleaner",
                            image: "https://via.placeholder.com/300x300.png?text=Robotic+Vacuum+Cleaner",
                            description: "Effortless cleaning with smart navigation",
                            price: 39900,
                        },
                        {
                            name: "Electric Coffee Maker",
                            image: "https://via.placeholder.com/300x300.png?text=Electric+Coffee+Maker",
                            description: "Brew perfect coffee every time",
                            price: 7900,
                        },
                        {
                            name: "Bluetooth Portable Speaker",
                            image: "https://via.placeholder.com/300x300.png?text=Bluetooth+Speaker",
                            description: "Rich sound in a compact design",
                            price: 12900,
                        },
                        {
                            name: "Digital SLR Camera",
                            image: "https://via.placeholder.com/300x300.png?text=Digital+SLR+Camera",
                            description: "Capture professional-quality photos",
                            price: 89900,
                        },
                        {
                            name: "Air Purifier Deluxe",
                            image: "https://via.placeholder.com/300x300.png?text=Air+Purifier+Deluxe",
                            description: "Clean air for a healthier home",
                            price: 29900,
                        },
                        {
                            name: "Electric Toothbrush Pro",
                            image: "https://via.placeholder.com/300x300.png?text=Electric+Toothbrush+Pro",
                            description: "Advanced cleaning for optimal oral health",
                            price: 8900,
                        },
                        {
                            name: "Wireless Charging Pad",
                            image: "https://via.placeholder.com/300x300.png?text=Wireless+Charging+Pad",
                            description: "Convenient charging for compatible devices",
                            price: 3900,
                        },
                        {
                            name: "Smart Home Security Camera",
                            image: "https://via.placeholder.com/300x300.png?text=Security+Camera",
                            description: "Monitor your home from anywhere",
                            price: 19900,
                        },
                        {
                            name: "Ergonomic Office Chair",
                            image: "https://via.placeholder.com/300x300.png?text=Ergonomic+Office+Chair",
                            description: "Comfortable seating for long work hours",
                            price: 24900,
                        },
                        {
                            name: "Noise-Cancelling Headphones",
                            image: "https://via.placeholder.com/300x300.png?text=Noise-Cancelling+Headphones",
                            description: "Immersive audio experience",
                            price: 34900,
                        },
                        {
                            name: "Multi-function Instant Pot",
                            image: "https://via.placeholder.com/300x300.png?text=Instant+Pot",
                            description: "All-in-one cooking solution",
                            price: 11900,
                        },
                    ];
                    _i = 0, products_1 = products;
                    _a.label = 1;
                case 1:
                    if (!(_i < products_1.length)) return [3 /*break*/, 4];
                    product = products_1[_i];
                    return [4 /*yield*/, db_1.default.product.create({
                            data: product,
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Seed data inserted successfully.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
