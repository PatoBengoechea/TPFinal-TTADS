import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    // Guardar valor de la confirmacion de password
    const confirmPassValue = control.value;

    // Traer el valor de la password para comparar
    const passControl = control.root.get("password");
    if (passControl) {
      const passwordValue = passControl.value;
      // Comparar valores
      if (passwordValue !== confirmPassValue)
        return {
          isError: true
        };
    }
    // Si esta todo ok retorno null (que indica que es valido el control)
    return null;
  }
}
