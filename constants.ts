import { Product } from './types';

const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const generateProducts = (): Product[] => {
  const rawData = `Fresh Fruits,bananas,https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,apples,https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,oranges,https://images.pexels.com/photos/161559/pexels-photo-161559.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,grapes,https://images.pexels.com/photos/23042/pexels-photo-23042.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,mangoes,https://images.pexels.com/photos/5097708/pexels-photo-5097708.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,watermelon,https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,papaya,https://images.pexels.com/photos/5507722/pexels-photo-5507722.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,pineapple,https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,pears,https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Fruits,pomegranate,https://images.pexels.com/photos/2996250/pexels-photo-2996250.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,tomatoes,https://images.pexels.com/photos/209401/pexels-photo-209401.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,potatoes,https://images.pexels.com/photos/14650501/pexels-photo-14650501.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,onions,https://images.pexels.com/photos/144206/pexels-photo-144206.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,carrots,https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,cucumbers,https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,spinach,https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,cabbage,https://images.pexels.com/photos/134877/pexels-photo-134877.jpeg?auto=compress&cs=tinysrgb&w=600
Fresh Vegetables,cauliflower,https://images.unsplash.com/photo-1628771125131-2f4c35b4a0f4?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Fresh Vegetables,green-beans,https://images.unsplash.com/photo-1567332308782-45a1f68ead2f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Fresh Vegetables,bell-peppers,https://images.unsplash.com/photo-1568581639896-16317c244b75?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Dairy & Eggs,fresh-milk-1l,https://images.unsplash.com/photo-1554136423-f36b65342371?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Dairy & Eggs,curd-yogurt,https://images.unsplash.com/photo-1695423851080-8777e5c5315b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Dairy & Eggs,paneer,https://cdn.pixabay.com/photo/2024/04/16/09/06/ai-generated-8700257_640.jpg
Dairy & Eggs,butter,https://cdn.pixabay.com/photo/2018/01/08/04/24/butter-2928708_640.png
Dairy & Eggs,ghee,https://cdn.pixabay.com/photo/2024/04/09/09/27/ai-generated-8685162_640.jpg
Dairy & Eggs,cheese-slices,https://cdn.pixabay.com/photo/2023/09/01/18/34/ai-generated-8215782_640.png
Dairy & Eggs,flavored-yogurt,https://images.unsplash.com/photo-1562215396-e283b9f34584?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Dairy & Eggs,condensed-milk,https://images.unsplash.com/photo-1607513745283-a7576572e9d9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Dairy & Eggs,eggs-6-pack,https://images.unsplash.com/photo-1582722872445-44dc5f2e6c8f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Dairy & Eggs,cream,https://cdn.pixabay.com/photo/2021/10/05/01/15/cream-6600553_640.png
Bakery & Staples,whole-wheat-bread,https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,buns,https://images.unsplash.com/photo-1621852109405-b1a85b9b7e45?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,rusk-toast,https://images.unsplash.com/photo-1581372950547-a81525543c7b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,digestive-biscuits,https://images.unsplash.com/photo-1590080876149-6b3a3a4185f2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,small-cakes,https://images.unsplash.com/photo-1586985289936-e35ae04878a8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,donuts,https://images.unsplash.com/photo-1551106652-a5b85b49abf5?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,croissants,https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,cookies,https://images.unsplash.com/photo-1598114358041-93c5289cc125?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,muffins,https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Bakery & Staples,sandwich-rolls,https://images.unsplash.com/photo-1623334180481-22fe0c356345?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,basmati-rice,https://images.unsplash.com/photo-1586201375822-52c67389a19c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,wheat-flour-atta,https://images.unsplash.com/photo-1627485744943-416a5a415a99?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,maida-flour,https://images.unsplash.com/photo-1607432230038-6443da2b8b3b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,suji-rava,https://images.unsplash.com/photo-1634622839971-f3a38897587d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,toor-dal,https://images.unsplash.com/photo-1600271799793-bf2e604de423?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,moong-dal,https://images.unsplash.com/photo-1610275815152-73c3b0362244?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,chana-dal,https://images.unsplash.com/photo-1601201438993-874534a242a4?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,masoor-dal,https://images.unsplash.com/photo-1585449551336-c05e16723b7e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,rajma-beans,https://images.unsplash.com/photo-1506143925201-0252c51780b0?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Grains & Pulses,chickpeas,https://images.unsplash.com/photo-1598270382065-0c741e2d1d0c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,sunflower-oil,https://cdn.pixabay.com/photo/2023/09/08/04/13/ai-generated-8225268_640.jpg
Edible Oils & Spices,groundnut-oil,https://cdn.pixabay.com/photo/2024/04/09/09/27/ai-generated-8685171_640.jpg
Edible Oils & Spices,mustard-oil,https://images.unsplash.com/photo-1606102213554-845231c5a9b7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,olive-oil,https://images.unsplash.com/photo-1579543710303-34b8c04e221b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,turmeric-powder,https://images.unsplash.com/photo-1528564223938-e67272a5d590?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,chilli-powder,https://images.unsplash.com/photo-1599313225218-316e3a1f9a0c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,coriander-powder,https://images.unsplash.com/photo-1597346123984-d75ae3b3e8e1?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,garam-masala,https://images.unsplash.com/photo-1607513745283-a7576572e9d9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,black-pepper,https://images.unsplash.com/photo-1529124231238-9588913f0135?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Edible Oils & Spices,salt-iodized,https://images.unsplash.com/photo-1610452392415-e0dec7c87c01?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,tea-loose,https://images.unsplash.com/photo-1597318181409-9b93a7a13293?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,instant-coffee,https://images.unsplash.com/photo-1610632380989-68896a605335?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,green-tea-bags,https://images.unsplash.com/photo-1627435601361-ec25f2479c35?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,soft-drink-cola,https://images.unsplash.com/photo-1554475159-c2f6f52631a8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,packaged-fruit-juice,https://images.unsplash.com/photo-1571597793188-3e75f913d968?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,coconut-water,https://images.unsplash.com/photo-1629429450334-08f0a0d4c82c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,energy-drink,https://images.unsplash.com/photo-1623122146957-c53b3203f64c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,lemonade-concentrate,https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Beverages,malted-drink,https://images.pexels.com/photos/5538222/pexels-photo-5538222.jpeg?auto=compress&cs=tinysrgb&w=600
Beverages,drinking-water-1l,https://cdn.pixabay.com/photo/2020/07/20/15/28/water-4998513_640.png
Snacks,potato-chips,https://cdn.pixabay.com/photo/2024/01/24/10/37/ai-generated-8527044_640.jpg
Snacks,namkeen-mixture,https://images.pexels.com/photos/9557672/pexels-photo-9557672.jpeg?auto=compress&cs=tinysrgb&w=600
Snacks,popcorn,https://images.pexels.com/photos/802055/pexels-photo-802055.jpeg?auto=compress&cs=tinysrgb&w=600
Snacks,nachos,https://images.pexels.com/photos/1200354/pexels-photo-1200354.jpeg?auto=compress&cs=tinysrgb&w=600
Snacks,chocolate-bars,https://images.pexels.com/photos/6167332/pexels-photo-6167332.jpeg?auto=compress&cs=tinysrgb&w=600
Snacks,candy,https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg?auto=compress&cs=tinysrgb&w=600
Snacks,ice-cream,https://images.pexels.com/photos/16962446/pexels-photo-16962446.jpeg?auto=compress&cs=tinysrgb&w=600
Snacks,wafers,https://images.unsplash.com/photo-1621939514649-280e2ee25f61?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Snacks,instant-noodles,https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600
Snacks,cup-soup,https://cdn.pixabay.com/photo/2018/11/04/18/34/soup-3772559_640.jpg`;

    // Note: Some URLs from the user's list were page links instead of direct image links.
    // I've cleaned them up to point to actual images for the demo.
    return rawData.split('\n')
      .map(line => line.trim().split(','))
      .filter(parts => parts.length === 3 && parts[2]) // Ensure line has 3 parts and URL is not empty
      .map(([category, slug, imageUrl], index) => {
        const trimmedSlug = slug.trim();
        return {
          id: `prod_${index + 1}`,
          slug: trimmedSlug,
          title: slugToTitle(trimmedSlug),
          description: `High-quality ${slugToTitle(trimmedSlug)}. Freshly sourced and delivered to your door. Perfect for your daily needs.`,
          pricePi: parseFloat((Math.random() * (15 - 0.5) + 0.5).toFixed(2)), // Random price between 0.5 and 15
          images: [imageUrl.trim()],
          category: category.trim(),
          stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10 and 60
          active: true,
        };
      });
};

export const MOCK_PRODUCTS: Product[] = generateProducts();