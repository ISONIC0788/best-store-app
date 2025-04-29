import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function CreateProduct(){
    const [validationError , setValidationErrors] = useState({});
    const navigate = useNavigate();

  async  function handleSubmit(event){
        event.preventDefault();
         
        const formData = new FormData(event.target);

        const product  = Object.fromEntries(formData.entries())

        if(!product.name || !product.brand || !product.category || !product.price || !product.image.name){
            alert("Please fill all filled");
            return
        }
        
        // alert("Thank you ");

        try{
         const response =  await  fetch("http://localhost:3000/products",{
                method:"POST",
                body: formData
             })

             const data = await response.json();

             if(response.ok){
                   //Product created  correctly 

                   navigate("/admin/products")
             }else if(response.status === 400 ){
                   // this for sevre error 
                   alert("Validation error");

                // setValidationErrors(data)
             }else{
                 alert("Unable to create  the product ");
             }
        }
        catch(error){
              alert("Unable to connect to server !");
        }
    }
    return(
        <>
          <div className="container my-4">
             <div className="row">
                <div className="col-md-8  mx-auto rounded border p-4">
                     <h2 className="text-center mb-5">Create Products</h2>

                     <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="name" />
                                <span className="text-danger">
                                    {/* {validationError.name} */}
                                    </span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="brand" />
                                <span className="text-danger">
                                    {/* {validationError.brand} */}
                                    </span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select name="category" className=" form-select" id="">
                                     <option value="Other">Other</option>
                                     <option value="phones">Phones</option>
                                     <option value="computers">Computers</option>
                                     <option value="accessories">Accessories</option>
                                     <option value="printers">Printers</option>
                                     <option value="cameras">Cameras </option>
                                </select>
                                <span className="text-danger">
                                    {/* {validationError.category} */}
                                    </span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" name="price"  step="0.01" min="1" />
                                <span className="text-danger">
                                    {/* {validationError.price} */}
                                    </span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" id="" name="description" rows="4"></textarea>
                                <span className="text-danger">
                                    {/* {validationError.description} */}
                                    </span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                            <input type="file" className="form-control" name="image"  step="0.01" min="1" />
                                <span className="text-danger"></span>
                            </div>
                        </div>

                        <div className="row mb-3">
                           <div className="offset-sm-4 col-sm-4 d-grid">
                                 <button type="submit" className="btn btn-primary">Submit</button>
                           </div >

                           <div className="col-sm-4 d-grid ">
                              <Link to="/admin/products" className="btn btn-secondary" role="button">Cancel</Link>
                           </div>
                        </div>



                     </form>
                </div>

             </div>
          </div>
        </>
    );
}