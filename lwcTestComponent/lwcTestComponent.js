import { LightningElement, wire } from 'lwc';
import returnProductsData from '@salesforce/apex/LWCTest.returnProductsData'
export default class LwcTestComponent extends LightningElement {
    productsData;
    showCart=false;
    productsInCart = [];
    @wire(returnProductsData, {})productsData({data,error}){
        if(data){
            console.log('data is ---> ' , data);
            this.productsData = data;
        }
        if(error){
            console.log('error is ---> '+ error);
        }
    };


    handleAddProduct(event){
        
        const productId = event.target.dataset.id; 
        const prodObj = this.productsData.find(product => product.productCode === productId);
        const inputElement = this.template.querySelector(`[data-input-id="${productId}"]`).value;
        console.log('prodObj is ---> ', prodObj);
        const prodObjChanged = {
            ...prodObj,
            index : this.productsInCart.length + 1,
            prodQuantity : inputElement,
            totalAmount : inputElement * prodObj.productPrice
        }
        console.log('prodObjChanged is --> ' + JSON.stringify(prodObjChanged));
        this.productsInCart.push(prodObjChanged);
        console.log('productsInCart is --> ' + JSON.stringify(this.productsInCart));
        if(this.productsInCart.length > 0 && !this.showCart){
            this.showCart = true;
        }

    }

    handleRemoveProducts(event){
        const productId = event.target.dataset.id;
        this.productsInCart = this.productsInCart.filter(product => product.productCode !== productId);
        console.log('after deleting the product ---> '+ JSON.stringify(this.productsInCart));
    }
}