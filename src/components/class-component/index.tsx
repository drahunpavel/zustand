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
      todos: [],
      loading: false,
      error: null,
    };

    unsubscribe: () => void = () => {};

    componentDidMount() {
      this.unsubscribe = useStoreTodos.subscribe((state) => {
        this.setState(state);
      });

      useStoreTodos.getState().fetchTodos();
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return (
        <Component
          {...(this.props as P)}
          todos={this.state.todos}
          loading={this.state.loading}
          error={this.state.error}
        />
      );
    }
  };
};

class ClassComponent extends React.Component<ComponentProps> {
  render() {
    const { todos, loading, error } = this.props;

    console.log("render class component: ", todos, error, loading);

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
