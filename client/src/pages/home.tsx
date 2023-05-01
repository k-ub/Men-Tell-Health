import { useList } from "@refinedev/core";
import { Typography, Box } from "@mui/material";

import {
    ArticleCard,
} from "components";

const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: "articles",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    const latestArticles = data?.data ?? [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>

            {/* <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Articles for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Articles for Rent"
                    value={550}
                    series={[60, 40]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Total customers"
                    value={5684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Articles for Cities"
                    value={555}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </Box> */}
{/* 
            <Stack
                mt="25px"
                width="100%"
                direction={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <TotalRevenue />
                <ArticleReferrals />
            </Stack> */}

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest Articles
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestArticles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            id={article._id}
                            title={article.title}
                            // location={article.location}
                            price={article.price}
                            photo={article.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;