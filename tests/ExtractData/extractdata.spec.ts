import { expect, Locator, test } from '@playwright/test'

test("Comparing methods:  ", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const products: Locator = page.locator(".product-title");
    //inntext() vs textcontent()
    //console.log(await products.nth(1).innerText()); //exactly text will be displayed
    //Simple Computer
    //console.log(await products.nth(1).textContent());// it does not display exact text might have spaces
    //            Simple Computer , neede to be trimmed()
    for (let index = 0; index < await products.count(); index++) {

        //console.log("innertext(): ", await products.nth(index).innerText());
        //console.log("TextContent(): ", await products.nth(index).textContent());
        //console.log("TextContent(): ", (await products.nth(index).textContent())?.trim());

    }
    //allinnetexts() vs allTextContents()

    /* const allproducts_it: string[] = await products.allInnerTexts();
     const allproducts_tc: string[] = await products.allTextContents();
 
     expect(allproducts_it.length).toBe(allproducts_tc.length);
 
     console.log("all inntexts()", allproducts_it);
     console.log("all textcontents()", allproducts_tc);
 
     const allproducts_tc_trimmed: string[] = allproducts_tc.map(text => text.trim());
     console.log(allproducts_tc_trimmed);
 
 
 
     for (let index = 0; index < allproducts_it.length; index++) {
         console.log(allproducts_it[index] + "   " + allproducts_tc_trimmed[index]);
     }*/
    //.all()

    const arrlocators: Locator[] = await products.all();
    console.log(arrlocators);

    for (const locator of arrlocators) {
        //console.log("all innertext: ", await locator.innerText());
    }
    for (const key in arrlocators) {

        console.log("innertext 'forin()': ", await arrlocators[key].innerText());

    }
    for (let index = 0; index < arrlocators.length; index++) {
        console.log(await arrlocators[index].innerText());

    }


});