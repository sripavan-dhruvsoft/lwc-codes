public class LWCTest {

    @AuraEnabled(cacheable = true)
    public static List<Wrapper> returnProductsData(){
        List<Product2> products = [SELECT Id,Name,ProductClass,ProductCode, Description from Product2 LIMIT 5];
        List<Wrapper> wrapperList = new List<Wrapper>();
        integer count = 1;
        for(Product2 prod : products){
            Wrapper wrapObj = new Wrapper();
            wrapObj.productName = prod.Name;
            wrapObj.productPrice = 100 * count;
            wrapObj.productCode = prod.ProductCode;
            wrapObj.productDescription = prod.Description;
            wrapperList.add(wrapObj);
            count++;
        }
        
        return wrapperList;
    }    
    
    
    
    public class Wrapper{
        @AuraEnabled public String productName;
        @AuraEnabled public Integer productPrice;
        @AuraEnabled public String productCode;
        @AuraEnabled public String productDescription;
        
    }

}