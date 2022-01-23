import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";
import clsx from "clsx";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
export async function getStaticProps({ params }) {
  // const data = await fetchCoffeeStores();
  const data = await coffeeStoresData;
  const coffeeStore = data.find((coffeeStore) => coffeeStore.id === params.id);
  return {
    props: {
      coffeeStore,
    },
  };
}

export async function getStaticPaths() {
  // const data = await fetchCoffeeStores();
  const data = await coffeeStoresData;

  const paths = data.map((coffeeStore) => ({
    params: { id: coffeeStore.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, name, neighbourhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ??
              "https://g.foolcdn.com/editorial/images/421803/coffee-with-froth-design-and-coffee-beans_soHhApC.jpg"
            }
            width={600}
            height={360}
            alt={name}
            className={styles.storeImg}
          />
        </div>
        <div className={clsx("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
