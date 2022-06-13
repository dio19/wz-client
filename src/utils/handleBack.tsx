import { MouseEventButton } from "../types/interfaces";

export default function handleBack(e: MouseEventButton) {
    e.preventDefault()
    window && window.history.back();
};