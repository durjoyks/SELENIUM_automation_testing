import { Browser, Builder, By, Key , until } from "selenium-webdriver"
import {expect} from "chai";

const product_name="Nike air zoom pegasus 35";



async function testRun(){
 
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://demo.evershop.io/");

    await driver.wait(async () => {
    const readyState = await driver.executeScript("return document.readyState");
    return readyState === "complete";
    }, 15000)


    await driver.manage().window().maximize();




    await driver.findElement(By.className("search-icon")).click();
    const SearchPath="//input[@placeholder='Search']";
    await driver.findElement(By.xpath(SearchPath)).sendKeys(product_name);
    await driver.findElement(By.xpath(SearchPath)).sendKeys(Key.ENTER);

    const actualValue1 = await driver.findElement(By.xpath("(//a[@href='/men/nike-air-zoom-pegasus-35-146'])[2]")).getText();
    const actualValue2 = await driver.findElement(By.xpath("(//span[contains(text(),'Nike air zoom pegasus 35')])[2]")).getText();
    const actualValue5 = await driver.findElement(By.xpath("(//span[contains(.,'Nike air zoom pegasus 35')])[2]")).getText();
    const actualValue3 = await driver.findElement(By.xpath("(//a[contains(@href , 'zoom-pegasus-35-146')])[2]")).getText();
    const actualValue4 = await driver.findElement(By.xpath("(//div[contains(@class , 'product-name product-list-name mt-4 mb-1')])[1]")).getText();

    const price1 = await driver.findElement(By.xpath("(//span[@class = 'sale-price font-semibold'])[1]")).getText();
    const price2 = await driver.findElement(By.xpath("(//div[@class ='product-name product-list-name mt-4 mb-1'])[1]/following-sibling::div[@class='product-price-listing']")).getText();


    //console.log(actualValue1 + "\n" + actualValue2 + "\n" + actualValue3 + "\n" + actualValue5 + "\n" + price1 + "\n" + price2);

    expect(product_name).to.include(actualValue1);

    function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


    const r1=getRandomIntInRange(2,3);
    const element = await driver.findElement(By.xpath(`(//span[contains(text(),'Nike air zoom pegasus 35')])[${r1}]`));
    const getProduct = await element.getText(); // get the text
    console.log(getProduct);
    await element.click(); // click on the element


    const r3=getRandomIntInRange(1,2);
    const ProductSize = await driver.findElement(By.xpath(`(//ul[@class='variant-option-list flex justify-start gap-2 flex-wrap'])[1]/descendant::li[${r3}]`));
    console.log(await ProductSize.getText());
    await ProductSize.click();


    await driver.sleep(2000);


    const r2=getRandomIntInRange(2,4);
    const ProductColor = await driver.findElement(By.xpath(`(//ul[@class='variant-option-list flex justify-start gap-2 flex-wrap'])[2]/descendant::li[${r2}]`));
    console.log(await ProductColor.getText());
    await ProductColor.click();

    await driver.sleep(2000);


    // Click "Add to cart"
    await driver.findElement(By.xpath("//div[@class='mt-4']")).click();



    // Wait for pop up "View Cart" button and click it
    const viewcartButton = await driver.wait(
    until.elementLocated(By.xpath("//a[@class='add-cart-popup-button']")),
    10000
    );
    await driver.wait(until.elementIsVisible(viewcartButton), 10000);
    await viewcartButton.click();



    //wait and click checkout 
    const checkout_button = await driver.wait(
    until.elementLocated(By.xpath("//a[@href='https://demo.evershop.io/checkout']")),
    10000
    );
    await driver.wait(until.elementIsVisible(checkout_button), 10000);
    await checkout_button.click();



    //input the email and proceed checkout
    const email_path="//input[@name='email' and @placeholder='Email']";
    await driver.findElement(By.xpath(email_path)).sendKeys("jucse28.376@gmail.com");
    await driver.findElement(By.xpath("(//button[@class='button primary'])[1]")).click();


    await driver.sleep(3000);



    //FORM fill up for checkout
    const name_path="//input[@name='address[full_name]' and @placeholder='Full name']";
    await driver.findElement(By.xpath(name_path)).sendKeys("Durjoy");

    const Telephone_path="//input[@placeholder='Telephone']";
    await driver.findElement(By.xpath(Telephone_path)).sendKeys("01789411875");

    const Address="//input[@placeholder='Address']";
    await driver.findElement(By.xpath(Address)).sendKeys("Dhaka cant.");

    const City="//input[@placeholder='City']";
    await driver.findElement(By.xpath(City)).sendKeys("Dhaka cant.");

    await driver.findElement(By.xpath("//select[@placeholder='Country']")).sendKeys("India"); // select an option from dropdown list
    await driver.findElement(By.xpath("//select[@placeholder='Province']")).sendKeys("Delhi");

    const Postcode="//input[@placeholder='Postcode']";
    await driver.findElement(By.xpath(Postcode)).sendKeys("1206");


    await driver.sleep(2000);

    // select the delivery option
    if (r3 === 1) {
        await driver.findElement(By.xpath("//label[@for='method1']")).click();
    } else {
        await driver.findElement(By.xpath("//label[@for='method0']")).click();
    }
        
    await driver.findElement(By.xpath("(//button[@class='button primary'])[1]")).click(); //continue payment


     await driver.sleep(3000);
     await driver.findElement(By.xpath("(//a[@href='#'])[5]")).click();// select cash on delivery
    // await driver.sleep(1500);
    // await driver.findElement(By.xpath("(//button[@class='button primary'])[2]")).click();//click place order
    // await driver.sleep(2500);
    // await driver.findElement(By.xpath("(//a[@href='/'])[3]")).click();//click continue shopping

    // Wait for "Place Order" button to be clickable and click
    const placeOrderBtn = await driver.wait(
    until.elementLocated(By.xpath("(//button[@class='button primary'])[2]")),
    10000
    );
    await driver.wait(until.elementIsVisible(placeOrderBtn), 10000);
    await placeOrderBtn.click();

    // Wait for "Continue Shopping" link to be clickable and click
    const continueShopping = await driver.wait(
    until.elementLocated(By.xpath("(//a[@href='/'])[3]")),
    10000
    );
    await driver.wait(until.elementIsVisible(continueShopping), 10000);
    await continueShopping.click();



    await driver.sleep(5000);
    await driver.quit();

}

testRun();
