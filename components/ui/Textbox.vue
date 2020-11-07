<template>
  <div class="group">
    <div class="floating-form">
      <div class="relative floating-input">
        <input
          class="w-full h-12 p-3 pt-6 pl-2 bg-gray-100 rounded shadow floating-input hover:cursor-pointer focus:outline-none"
          :class="cls"
          placeholder=" "
          v-bind="$attrs"
          :value="value"
          @input="$emit('input', $event.target.value)"
          @keyup="$emit('keyup', $event.target.value)"
          @change="$emit('change', $event.target.value)"
          @blur="$emit('blur', $event.target.value)"
          :type="type"
          :aria-label="label"
        />
        <span class="highlight"></span>
        <label class="absolute text-gray-700">{{ label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: String, default: 'text' },
    value: { type: [Number, String] },
    cls: { type: String },
  },
}
</script>

<style scoped>
.floating-input {
  font-size: 0.875rem;
}
.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -2px;
  color: #02baf2;
}

label {
  pointer-events: none;
  left: 8px;
  top: 14px;
  transition: 0.2s ease all;
}
</style>
