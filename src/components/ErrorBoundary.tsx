import { Component, type ReactNode } from "react";
import { ErrorPage } from "@/components/layout/ErrorPage";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  resetKey?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.state.hasError && this.props.resetKey !== prevProps.resetKey) {
      this.setState({ hasError: false });
    }
  }

  resetBoundary = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorPage
            code="500"
            eyebrow="Erreur inattendue"
            title="Une erreur est survenue"
            text="Une erreur inattendue s'est produite. Vous pouvez réessayer ou revenir à l'accueil."
            primaryLabel="Retour à l'accueil"
            primaryHref="/"
            secondaryLabel="Réessayer"
            onSecondaryClick={this.resetBoundary}
            tertiaryLabel="Rafraîchir la page"
            onTertiaryClick={() => window.location.reload()}
          />
        )
      );
    }

    return this.props.children;
  }
}
