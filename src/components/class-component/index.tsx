import React from "react";
import { useStoreTodos, TodosStoreState } from "../../store/useStoreTodos";

type ComponentProps = Pick<
  TodosStoreState,
  "todos" | "loading" | "error" | "fetchTodos"
>;

const withZustand = <P extends ComponentProps>(
  Component: React.ComponentType<P>
): React.ComponentType => {
  return class extends React.Component {
    state = {
      todos: useStoreTodos.getState().todos,
      loading: useStoreTodos.getState().loading,
      error: useStoreTodos.getState().error,
    };

    unsubscribe: () => void = () => {};

    componentDidMount() {
      this.unsubscribe = useStoreTodos.subscribe((state) => {
        this.setState({
          todos: state.todos,
          loading: state.loading,
          error: state.error,
        });
      });
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    render() {
      return (
        <Component
          {...(this.props as P)}
          todos={this.state.todos}
          loading={this.state.loading}
          error={this.state.error}
          fetchTodos={useStoreTodos.getState().fetchTodos}
        />
      );
    }
  };
};

class ClassComponent extends React.Component<ComponentProps> {
  componentDidMount() {
    setTimeout(() => {
      this.props.fetchTodos();
    }, 1000);
  }

  render() {
    console.log("--props: ", this.props);
    const { todos, loading, error } = this.props;

    return (
      <div>
        <p>class component</p>
        <hr />
        {loading && <div>loading...</div>}
        {error && <div>error: {error}</div>}
        {!!todos.length && <div>data: {JSON.stringify(todos)}</div>}
      </div>
    );
  }
}

export default withZustand(ClassComponent);
