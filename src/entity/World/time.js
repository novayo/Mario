import { updateMarioPosition, updateMarioVels, updateMarioCollision } from '../Mario/action';

export default function time() {
    updateMarioVels();
    updateMarioCollision();
    updateMarioPosition();
}