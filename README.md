# Ecommerce-Backend

                                                            Ecommerce backend project
                                                            
                                                            
Functionality:
  •	It’s a proper backend for an ecommerce site developed in Javascript.
  •	User can perform Sign in, log in, add product to cart, proceed to order from added cart products. 
Technologies used:
  •	Express
  •	Sequelize(Orm)
  •	MySQL (dbms)
  •	Path
  •	Other modules used-:
    	jsonwebtoken- for JWT interaction.
    	Fs
    	..
Database (Tables) requires:
  •	Category table: to contain category/type of product available on site.
  •	Product table: contains all product available and their respective category, prices, descriptions, images.
  •	Customer table: contains all registered user’s details {email (generally used as identification key), name, phone no., password}.
  •	Cart table: contains all product added to his cart by a user (user id as foreign key).
  •	Order table: contains all orders by registered user (user id as foreign key) and its payment status (pending as default).
  •	Order-Item table:  container product items for a respective order id (foreign key). It also container qty ordered and total amount after discounted. 
  •	Product-Comments: feedback from users to a product.

Routers Info:
  •	


JWT Interaction:
  •	  With use of jsonwebtoken we create a function i.e. generatewebtoken(email)- which then use jwt(object from imported module).sign function that takes string(we used email as verification key) and a Token_Secret ,then forms a token(Bearer token).

  •	To verify a user (while login) we make a middleware named   authenticateToken which with help of jwt.verify function verifies the token and gives err or tokendata as required variable.
