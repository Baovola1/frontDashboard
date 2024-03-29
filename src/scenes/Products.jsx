import React,{useState} from 'react';
import {Box,Card,CardActions,CardContent, Collapse,Button,Typography, Rating,useTheme,useMediaQuery } from "@mui/material";
import {useGetProductsQuery} from "../redux/api";
import ProductHeader from '../components/ProductHeader';

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
})=>{
    const Theme = useTheme();
    const [isExpanded,setIsExpanded] = useState(false);

    return(
        <Card sx={{backgroundImage:"none", backgroundColor:Theme.palette.background.alt,borderRadius:"0.55rem", }}>
            <CardContent>
                <Typography sx={{fontSize:14}} color={Theme.palette.secondary[700]} gutterBottom>{category}</Typography>
                <Typography variant="h5" component="div">{name}</Typography>
                <Typography sx={{mb:"1.5rem"}} color={Theme.palette.secondary[400]}>${Number(price).toFixed(2)}</Typography>
                <Rating value={rating} readOnly/>
                <Typography variant='body2'>{description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='primary' size='small' onClick={()=>setIsExpanded(!isExpanded)}>
                    See More
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{color: Theme.palette.neutral[300]}}>
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
                    <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

 const Products=()=> {
    const {data, isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    console.log(data);

    // Affichage d'un message de chargement ou de non-disponibilité des données
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available.</div>;
    }


  return (
    <>
     <Box m="1.5rem 2.5rem">
                <ProductHeader title="PRODUCTS" subtitle="See your list of products."/>  
                <Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                }}>
                    {data.map((product) => (
                        <Product
                            key={product._id}
                            _id={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            rating={product.rating}
                            category={product.category}
                            supply={product.supply}
                            stat={product.stat}
                        />
                    ))}
                </Box>
            </Box>
    </>
  )
}

export default Products;
