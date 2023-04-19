import { useAccount } from "wagmi";
import { useQueryToken } from "@/hooks/fetchBackend";
import Asset from "@/components/asset";
import ErrorContainer from "@/components/asset/errorContainer";
import { useRouter } from "next/router";
import { getFirstOrString } from "@/utils/stringUtils";

const Assets: React.FC = () => {
  const { status } = useAccount();
  const router = useRouter();
  const tokenId = getFirstOrString(router.query.tokenId);
  const chain = getFirstOrString(router.query.chain);

  const { loading, token, error } = useQueryToken(tokenId, chain);

  return (
    <div>
      {!token && (error || loading || status === "reconnecting") ? (
        <ErrorContainer
          {...{ loading: loading || status === "reconnecting", msg: error }}
        />
      ) : token ? (
        <Asset {...{ loading, token }} />
      ):null}
    </div>
  );
};

export default Assets;
