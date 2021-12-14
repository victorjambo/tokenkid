import { SupportedProviders } from "@celo-tools/use-contractkit";
import { Provider } from "@celo-tools/use-contractkit/lib/types";

const RenderProvider: React.FC<{
  provider: Provider;
  onClick: () => void;
}> = ({ provider, onClick }) => {
  console.log(provider, SupportedProviders);

  return <button onClick={onClick}>{provider.name}</button>;
};
export default RenderProvider;
