import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ToastProvider, useToast } from "@/components/ui/ToastProvider";

// Helper component that triggers toasts
function ToastTrigger() {
  const toast = useToast();
  return (
    <div>
      <button onClick={() => toast.success("Item added!")}>Show Success</button>
      <button onClick={() => toast.error("Something failed")}>Show Error</button>
    </div>
  );
}

describe("Toast notification system", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders success toast with correct message", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Item added!")).toBeInTheDocument();
  });

  it("renders error toast with correct message", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Error"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something failed")).toBeInTheDocument();
  });

  it("success toast has green border styling", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("border-[#4A7C59]");
  });

  it("error toast has red border styling", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Error"));
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("border-[#dc2626]");
  });

  it("auto-dismisses after 5 seconds", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Advance past auto-dismiss (5s) + exit animation (200ms)
    act(() => {
      vi.advanceTimersByTime(5200);
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("manual close button dismisses the toast", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Close notification"));

    // Wait for exit animation
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("stacks multiple toasts vertically", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    await user.click(screen.getByText("Show Error"));

    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });

  it("toast has role='alert' for accessibility", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("toast container is positioned fixed at top-right", () => {
    const { container } = render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    const toastContainer = container.querySelector("[aria-live='polite']");
    expect(toastContainer).toBeInTheDocument();
    expect(toastContainer!.className).toContain("fixed");
    expect(toastContainer!.className).toContain("top-4");
    expect(toastContainer!.className).toContain("right-4");
  });

  it("throws error when useToast is used outside ToastProvider", () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    function BadComponent() {
      useToast();
      return null;
    }

    expect(() => render(<BadComponent />)).toThrow(
      "useToast must be used within a ToastProvider",
    );

    spy.mockRestore();
  });
});
